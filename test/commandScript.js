function commandTest() {
  var sys = require('sys')
  var exec = require('child_process').exec;
  var child;
  // executes `pwd`
  child = exec("ls -la", function (error, stdout, stderr) {
      console.log(`${stdout}`);
      console.log(`${stderr}`);
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
  });
}