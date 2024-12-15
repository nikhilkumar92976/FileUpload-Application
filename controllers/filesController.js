const File = require('../models/file');
const cloudinary = require('cloudinary').v2;

        //step 1: find the data in request body
        //step 2: create the path to save the file
        //step 3: move the file into this path
        //step 4: return response is sucesss
exports.localFileUpload = async (req,res)=>{
    try{
        // find data in request body
        const file = req.files.file;
        console.log("file: ",file);

        // find the path which place data are sotre in localy
        // current directiry + file path + filename (date) + find the type of file
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;

        //move the file
        file.mv(path,()=>{
            console.log('file save unsuccessful');
        })

        res.json({
            sucess: true,
            message: 'file uploaded successfully',
            filePath: path
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'kuch to garbar hai'});
    }
}


// image upload function
        //step 1: find data in request body
        //step 2: find file data in request files body
        //step 3: create a list which type of data you allow to store
        //step 4: check the file type is supported or not
        //step 5: if file type is supported then upload the file to cloudinary
        //step 6: save the file data in db
        //step 7: return response is sucesss
function isSupportedFileType(type,supporedType){
    return supporedType.includes(type);
}

async function uploadToCloudinary(file,folder,quality){
    const options ={folder};
    // console.log(file);
    // console.log(options);
    if(quality){ // this line help to set the qualit of image upload
        options.quality = quality;
    }
    options.resource_type = "auto"; // if you upoad the video file thats way use type auto
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async(req,res)=>{
    try{
        //fetch the data in request
        const {name,tag,email} = req.body;
        console.log(name,tag,email);
        const file = req.files.file;
        console.log("file: ",file);
        
        // validation suppored file type
        const supporedFileType = ["jpg", "png", "jpeg"];
        const myFileType = file.name.split('.')[1].toLowerCase();
        console.log(myFileType);

        if(!isSupportedFileType(myFileType,supporedFileType)){
            return res.status(400).json({message: 'Invalid file type'});
        }

        //if file is supported
        const response = await uploadToCloudinary(file,"myCloudData");
        console.log(response,"file uploaded successfully");

        //db me entry create karo
        const newFile = await File.create({
            name,
            tag,
            email,
            imageURL: response.secure_url
        });

        res.json({
            success: true,
            message: 'image uploaded successfully',
            file: newFile
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'image upload to garbar hai'});
    }
}


// video upload function
exports.videoUpload = async(req,res)=>{
    try{
          //fetch the data in request
          const {name,tag,email} = req.body;
          console.log(name,tag,email);

          const file = req.files.file;
          console.log("file: ",file);
          
          // validation suppored file type
          const supporedFileType = ["mp4","mov"];
          const myFileType = file.name.split('.')[1].toLowerCase();
          console.log(myFileType);
  
          if(!isSupportedFileType(myFileType,supporedFileType)){
              return res.status(400).json({message: 'Invalid file type'});
          }
  
          //if file is supported
          const response = await uploadToCloudinary(file,"myCloudData");
          console.log(response,"video uploaded successfully");
  
          //db me entry create karo
          const newFile = await File.create({
              name,
              tag,
              email,
              imageURL: response.secure_url
          });
  
          res.json({
              success: true,
              message: 'video uploaded successfully',
              file: newFile
          })
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'video upload to garbar hai'});
    }
}


// image quality reducer
exports.imageUploadQuality = async (req,res) =>{
    try{
        //fetch the data in request body
        const {name,tag, email} = req.body;
        console.log(name,tag,email);

        const file = req.files.file;
        console.log("file: ",file);
        
        // validation suppored file type
        const supporedFileType = ["jpg", "png", "jpeg"];
        const myFileType = file.name.split('.')[1].toLowerCase();
        console.log(myFileType);

        if(!isSupportedFileType(myFileType,supporedFileType)){
            return res.status(400).json({message: 'Invalid file type'});
        }
        // if file type is supported then upload the file to cloudinary
        const response = await uploadToCloudinary(file,"myCloudData",3);
        console.log(response,"file uploaded successfully");
        
        //db me entry create karo
        const newFile = await File.create({
            name,
            tag,
            email,
            imageURL: response.secure_url
        });

        res.json({
            success: true,
            message: 'Image quility reduce uploaded successfully',
            file: newFile
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'image quality reduction to garbar hai'});
    }
}