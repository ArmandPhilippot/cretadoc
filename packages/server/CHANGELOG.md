# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 1.0.0 (2023-08-28)


### ⚠ BREAKING CHANGES

* **server:** the signature of the render function has been modified
and you no longer need to provide placeholders and the path of an html
file to use SSR. It is up to you to determine how to generate your HTML
* **server:** ServerRender type has been renamed to RenderFunction
* **server:** the API config is no longer an object, you must pass
the instance directly and declare the route (if needed) in the API
config.
* **server:** ServerReturn type has been renamed to CretadocServer

* **server:** convert functions to middleware ([bc6d8bf](https://github.com/ArmandPhilippot/cretadoc/commit/bc6d8bf1570786bd8ec957e6e6dff1c0936e6204))


### Features

* **server:** accepts to serve a Cretadoc API instance ([c05362d](https://github.com/ArmandPhilippot/cretadoc/commit/c05362d7827c7deb67e603f225e229b2c0831d28))
* **server:** add a placeholder to preload some files ([f86c86c](https://github.com/ArmandPhilippot/cretadoc/commit/f86c86c12a07da777d73a767f31261752331f747))
* **server:** add a placeholder to share state between server/client ([74f0250](https://github.com/ArmandPhilippot/cretadoc/commit/74f02506cc1406d44fb6ce9e7f95d41174988a37))
* **server:** add Request object as parameter in render function ([d8f44d0](https://github.com/ArmandPhilippot/cretadoc/commit/d8f44d0896ce70dc62ab427a1126407c640fa71b))
* **server:** allow user to serve a static directory ([63eb7df](https://github.com/ArmandPhilippot/cretadoc/commit/63eb7dfb896e30d33a05f94765a4c6b933323c05))
* **server:** create an Express app ([5093330](https://github.com/ArmandPhilippot/cretadoc/commit/5093330eb551becf2aff51169bc3d618284ded59))
* **server:** implements SSR with Vite ([37b1214](https://github.com/ArmandPhilippot/cretadoc/commit/37b12142695ff46716f2c6dd4ce20ae5a8a3153d))
* **server:** make SSR rendering agnostic ([368cdfd](https://github.com/ArmandPhilippot/cretadoc/commit/368cdfdce2fed1f9b1e61eeaeba020e93ab73c4f))


### Bug Fixes

* **server:** do not use Vite server on production mode ([9f78705](https://github.com/ArmandPhilippot/cretadoc/commit/9f78705e6316b3b60ce4717ecb2c8cda41e5e561))
* **server:** export all types ([5528e50](https://github.com/ArmandPhilippot/cretadoc/commit/5528e500ccdfcf1c1cabc5ebd6645eb20fb2b735))
* **server:** remove references to APIConfig ([9664fd9](https://github.com/ArmandPhilippot/cretadoc/commit/9664fd901923c5d9d7354cd059f406ce6919c779)), closes [#ae8630](https://github.com/ArmandPhilippot/cretadoc/issues/ae8630)
* **server:** use API endpoint to serve API ([ae8630a](https://github.com/ArmandPhilippot/cretadoc/commit/ae8630a4a6c1cdb92d96b06ae2f146ae5807cd26))
* **server:** wrap SSR initial state with quotes ([84e7ca1](https://github.com/ArmandPhilippot/cretadoc/commit/84e7ca1bb96a9a33ae5cca100918cc0f1c66f49b))
