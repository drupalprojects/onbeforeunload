// $Id$

// Make sure our Drupal object exists.
Drupal.onBeforeUnload = Drupal.onBeforeUnload || { __callbacks: {} };

/**
 * Drupal behavior for Before Onload API.
 */
Drupal.behaviors.onBeforeUnload = function(context) {
  // Bind our window handler if not already bound.
  if (!Drupal.onBeforeUnload.processed) {
    Drupal.onBeforeUnload.processed = true;
    window.onbeforeunload = Drupal.onBeforeUnload.__windowHandler;
  }
};

/**
 * Global window handler for the onBeforeUnload event.
 */
Drupal.onBeforeUnload.__windowHandler = function() {
  var module, callback, result, results = [];

  // Invoke all installed onBeforeUnload callbacks.
  for (module in Drupal.onBeforeUnload.__callbacks) {
    callback = Drupal.onBeforeUnload.__callbacks[module];

    // Ignore callbacks that have been removed.
    if (typeof callback != 'function') {
      continue;
    }

    // Invoke the callback and save the results.
    result = (callback)();
    if (typeof result == 'string') {
      results[results.length] = result;
    }
  }

  // If we got any results, then we'll return them concatenated.
  // This will fire up a confirmation alert to the user that's
  // implemented by the browser itself (it cannot be themed).
  if (results.length > 0) {
    return results.join('\n');
  }
};

/**
 * Add an onBeforeUnload callback.
 *
 * Note that it only possible to add one callback per module.
 * It is up to the module implementing the callback itself to
 * perform any check additional tasks it may need.
 *
 * @param module
 *   The name of the module that adds the onBeforeUnload callback.
 * @param callback
 *   A function that will be called without arguments by our
 *   global onBeforeUnload handler.
 * @return
 *   TRUE if the callback was successfully added, FALSE otherwise.
 */
Drupal.onBeforeUnload.addCallback = function(module, callback) {
  if (typeof module == 'string' && typeof callback == 'function') {
    this.__callbacks[module] = callback;
    return true;
  }
  return false;
};

/**
 * Remove an onBeforeUnload callback.
 *
 * @param module
 *   The name of the module.
 * @return
 *   TRUE if the callback was successfully removed, FALSE otherwise.
 */
Drupal.onBeforeUnload.removeCallback = function(module) {
  if (typeof this.__callbacks[module] == 'function') {
    this.__callbacks[module] = null;
    return true;
  }
  return false;
};

/**
 * Check if a callback for a particular module exists.
 *
 * @param module
 *   The name of the module.
 * @return
 *   TRUE if the callback exists, FALSE otherwise.
 */
Drupal.onBeforeUnload.callbackExists = function(module) {
  return (typeof this.__callbacks[module] == 'function');
};
