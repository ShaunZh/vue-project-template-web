/**
 * @Author: Hexon
 * @Date: 2018/11/1 下午7:40
 * @Last Modified by: Hexon
 * @Last Modified time: 2018/11/1 下午7:40
 * @description:
 */

import {CONST_DEFAULT_CONFIG} from 'Config';
import CONST_CONFIG from 'Service/const';

class MakeConst {
  constructor(options) {
    this.const = {};
    this.constBuilder(options);
  }

  constBuilder({sep = '/', config = []}) {
    Object.keys(config).map(namespace => {
      this._constSingleBuilder({
        namespace,
        sep,
        config: config[namespace]
      });
    });
  }

  _constSingleBuilder({namespace, sep = '/', config = {}}) {
    config.forEach(cst => {
      let {name, value} = cst;
      let constName = `${namespace.toUpperCase()}${sep}${name}`;
      Object.defineProperty(this.const, constName, {
        value
      });
    });
  }
}

console.log(
  new MakeConst({
    config: CONST_CONFIG,
    ...CONST_DEFAULT_CONFIG
  })['const']
);

export default new MakeConst({
  config: CONST_CONFIG,
  ...CONST_DEFAULT_CONFIG
})['const'];
