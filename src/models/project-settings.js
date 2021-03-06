import path from 'path';
import { copySync } from 'fs-extra';
import jf from 'jsonfile';
import { pwd } from 'shelljs';
import fs from 'fs';

import { fileExists } from '../util/fs';

export default class ProjectSettings {
  constructor(relativePath) {
    this.relativePath = relativePath || '../../templates/.config';
    this.loadSettings();
  }

  loadSettings() {
    if (this.settingsExist()) {
      this.settings = jf.readFileSync(this.settingsPath());
    } else {
      this.buildFromTemplate();
      this.settings = jf.readFileSync(this.settingsPath());
    }
  }

  templatePath() {
    return path.join(
      path.dirname(module.id), this.relativePath
    );
  }

  writeSecureJson(name, json) {
    fs.writeFileSync(`${process.cwd()}/${name}`, JSON.stringify(json), {encoding: 'utf-8'});
  }

  buildFromTemplate() {
    copySync(this.templatePath(), this.settingsPath());
  }

  settingsPath() {
    return path.join(process.cwd(), '.config');
  }

  settingsExist() {
    return fileExists(this.settingsPath());
  }

  getSetting(key) {
    return this.settings[key];
  }

  getAllSettings() {
    return this.settings;
  }

  setSetting(key, val) {
    this.settings[key] = val;
  }

  setAllSettings(json) {
    this.settings = json;
  }

  save() {
    jf.writeFileSync(this.settingsPath(), this.settings);
  }
}