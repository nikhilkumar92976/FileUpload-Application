
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