const Helpers__mapping = require('./mapping');
const Helpers__casting = require('./casting');
const Helpers__async = require('./async');
const Helpers__wrapping = require('./wrapping');

/**
  @class
  * **The Unit Tests**
  This section contains the **unit tests** for the properties/methods from all sections of {@linkplain Helpers} chapter.
  To show the **source code** of specific unit test, please click `line` number at the right side of the item.
  @hideconstructor
*/
class Tests__Helpers {} // eslint-disable-line

/**
  @class
  This class describes versatile useful **helper functions and objects** available from this library.
  It consists of the functions, which are directly accessible from the package import namespace.

  All these functions are described through the following **sections**:

  -- {@linkplain Helpers__mapping **mapping**} -- Functional helpers for **data mapping**.

  -- {@linkplain Helpers__casting **casting**} -- Functional helpers for **type cast** and conversion.

  -- {@linkplain Helpers__wrapping **wrapping**} -- Various **wrappers and reflections**
    for iterators and functional helpers.

  All the functions are covered by the **tests** in {@linkplain Tests__Helpers **Tests for Helpers**} section,
  which can also be used as **examples**.
  @hideconstructor
*/
const Helpers = {
  ...Helpers__mapping,
  ...Helpers__casting,
  ...Helpers__async,
  ...Helpers__wrapping,
};

module.exports = Helpers;
