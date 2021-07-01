const fs = require('fs')
const sharp = require('sharp')

module.exports = {
  async upload (req, res) {
    console.log('test')
    try {
        
      let sampleFile = req.files.sampleFile
      let uploadPath = __dirname + '/public2/' + sampleFile.name
      let f = (/[.]/.exec(sampleFile.name)) ? /[^.]+$/.exec(sampleFile.name) : undefined
      let newPath = null
      await sampleFile.mv(uploadPath, async function(err) {
        if (err) {
          return res.status(500).send(err);
        } else {
          newPath = __dirname + '/public2/' + req.headers.name + "." + f[0]
          await fs.rename(uploadPath, newPath, (err) => {
            if (err) throw err;
            else {
              sharp(newPath)
              .resize(480)
              .toFile(__dirname + '/public/' + req.headers.name + "." + f[0], (err, info) => { 
                res.send({ path: req.headers.name + "." + f[0] })
              });
            }
          });
        }
      });
    }
    catch (err) {
      res.status(500).send(err)
    }
  }
}