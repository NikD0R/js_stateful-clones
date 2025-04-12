'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsCopy = [];
  const stateNew = { ...state };

  for (const n of actions) {
    switch (n.type) {
      case 'addProperties':
        for (const val of Object.entries(n.extraData)) {
          stateNew[val[0]] = val[1];
        }
        actionsCopy.push({ ...stateNew });
        break;

      case 'removeProperties':
        for (const val of n.keysToRemove) {
          if (Object.hasOwn(stateNew, val)) {
            delete stateNew[val];
          }
        }
        actionsCopy.push({ ...stateNew });
        break;

      case 'clear':
        for (const entry of Object.entries(stateNew)) {
          delete stateNew[entry[0]];
        }
        actionsCopy.push({ ...stateNew });
        break;
    }
  }

  return actionsCopy;
}

module.exports = transformStateWithClones;
