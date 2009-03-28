// $Id$

/**
 * Install the Drupal behavior.
 *
 * This function will be called by Drupal.attachBehaviors() in misc/drupal.js.
 */
Drupal.behaviors.onbeforeunload_example = function(context) {
  if (!Drupal.onBeforeUnload.callbackExists('onbeforeunload_example')) {
    Drupal.onBeforeUnload.addCallback('onbeforeunload_example', Drupal.onbeforeunload_example);
  }
};

/**
 * onBeforeUnload Example callback.
 *
 * This function will be called by onBeforeUnload API when the user leaved the
 * page.
 *
 * The string returned here will be prompted to the user, so do NOT return
 * anything if you do not need to.
 */
Drupal.onbeforeunload_example = function() {
  if (Drupal.settings.onBeforeUnloadExample.showWarning) {
    return 'Hello world!\n\nThis warning has been provided by the onBeforeUnload Example module.';
  }
};
