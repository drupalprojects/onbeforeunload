// $Id$

// Make sure our Drupal object exists.
Drupal.onBeforeUnload = Drupal.onBeforeUnload || { _callbacks: {} };

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
 *
 * @private
 */
Drupal.onBeforeUnload.prototype.__windowHandler = function() {
  var module, callback, result, results = [];

  // Invoke all installed onBeforeUnload callbacks.
  for (module in Drupal.onBeforeUnload._callbacks) {
    callback = Drupal.onBeforeUnload._callbacks[module];

    // Ignore uninstalled callbacks.
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
 * @public
 *
 * @param module
 *   The name of the module that installs the callback.
 *   Note that one module can only install one onBeforeUnload callback.
 * @param callback
 *   A function that will be called without arguments by our
 *   global onBeforeUnload handler.
 * @return
 *   TRUE if the callback was successfully installed. FALSE otherwise.
 */
Drupal.onBeforeUnload.prototype.addCallback = function(module, callback) {
  if (typeof module == 'string' && typeof callback == 'function') {
    this._callbacks[module] = callback;
    return true;
  }
  return false;
};

/**
 * Remove an onBeforeUnload callback.
 *
 * @public
 *
 * @param module
 *   The name of the module.
 * @return
 *   TRUE if the callback was successfully uninstalled. FALSE otherwise.
 */
Drupal.onBeforeUnload.prototype.removeCallback = function(module) {
  if (typeof this._callbacks[module] == 'function') {
    this._callbacks[module] = null;
    return true;
  }
  return false;
};
