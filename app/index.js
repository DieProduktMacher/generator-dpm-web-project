'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'title',
        message: `What's the name of your project?`,
        default: this.appname // Default to current folder name
      },
      {
        type: 'input',
        name: 'description',
        message: `What's this web project about?`
      },
    ]).then((answers) => {
      // Title must be without whitespace for a correct package.json file
      // answers.title = answers.title.replace(' ', '-')
      answers.title = answers.title.replace(/\s/g, '-').toLowerCase()
      this.answers = answers

      this.log('app name', answers.title)
    })
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.answers
    )
  }
}
