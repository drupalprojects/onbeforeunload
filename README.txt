;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; onBeforeUnload API
;; $Id$
;;
;; Project homepage: http://drupal.org/project/onbeforeunload
;; Module Author: markus_petrux (http://drupal.org/user/39593)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

CONTENTS OF THIS FILE
=====================
* OVERVIEW
* INSTALLATION
* BASIC SAMPLE
* API DOCUMENTATION


OVERVIEW
========

The onBeforeUnload module provides an API to allow other modules use the
onBeforeUnload event of the browser window.

This module does not provide any direct functionally, it rather provides
a centralized API that other modules can use to take advantage of the
onBeforeUnload event of the browser window.

Modules using the onBeforeUnload API:

- http://drupal.org/project/dirtyforms (Dirty Forms).


INSTALLATION
============

- Copy all contents of this package to your modules directory preserving
  subdirectory structure.

- Goto Administer > Site building > Modules to install this module.


BASIC SAMPLE
============

Let's say your module needs to perform some check when the user leaves the page.
Ok, this module should add a javascript file to the page with a code similar to
this:

<code>
Drupal.behaviors.mymodule = function(context) {
  if (!Drupal.onBeforeUnload.callbackExists('mymodule')) {
    Drupal.onBeforeUnload.addCallback('mymodule', function() {
      return 'Hello world!';
    });
  }
};
</code>


API DOCUMENTATION
=================

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
Drupal.onBeforeUnload.addCallback = function(module, callback) {};

/**
 * Remove an onBeforeUnload callback.
 *
 * @param module
 *   The name of the module.
 * @return
 *   TRUE if the callback was successfully removed, FALSE otherwise.
 */
Drupal.onBeforeUnload.removeCallback = function(module) {};

/**
 * Check if a callback for a particular module exists.
 *
 * @param module
 *   The name of the module.
 * @return
 *   TRUE if the callback exists, FALSE otherwise.
 */
Drupal.onBeforeUnload.callbackExists = function(module) {};
