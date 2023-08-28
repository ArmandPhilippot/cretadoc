# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 1.0.0 (2023-08-28)


### ⚠ BREAKING CHANGES

* **api:** The data config keys require an object with
path and baseUrl instead of a string
* **api:** nested paginations are no longer available
* **api:** _meta files are no longer supported, you should use
index.md files instead
* **api:** contents field no longer exists in DocDirectory type
* **api:** the contents field on doc directory is now returning
paginated contents (edges) instead of directories and files.
* **api:** createAPI is now returning a Promise

### Features

* **api:** add a meta field to doc directory parent ([daea228](https://github.com/ArmandPhilippot/cretadoc/commit/daea2281d1234e68a26cb419c7942482bcff163e))
* **api:** add a mutation to create documentation directories ([b0ed5d2](https://github.com/ArmandPhilippot/cretadoc/commit/b0ed5d28a62d7ae0f1fa8cdae326612ee01128e5))
* **api:** add a mutation to create documentation files ([a0cd87e](https://github.com/ArmandPhilippot/cretadoc/commit/a0cd87e766b7b8842595bbdef51b953fc32f71fe))
* **api:** add a mutation to create pages ([43e70f5](https://github.com/ArmandPhilippot/cretadoc/commit/43e70f5320aa4fbecc735168ce6b8bdc18d95acc))
* **api:** add a mutation to delete documentation directories ([0c2c0cd](https://github.com/ArmandPhilippot/cretadoc/commit/0c2c0cd4a93f40fcf734e632e1876b1484fe90b0))
* **api:** add a mutation to delete documentation files ([c1fcbbb](https://github.com/ArmandPhilippot/cretadoc/commit/c1fcbbb4121e91e0aa51c9f2fc11a4fd6ee03942))
* **api:** add a mutation to delete pages ([f3a2ec7](https://github.com/ArmandPhilippot/cretadoc/commit/f3a2ec7d3f1685cd035882a01ad784a19eaec391))
* **api:** add a mutation to update documentation directories ([ca64aed](https://github.com/ArmandPhilippot/cretadoc/commit/ca64aed3b2245fbba61238cd38593e280f073791))
* **api:** add a mutation to update documentation files ([a0a80ca](https://github.com/ArmandPhilippot/cretadoc/commit/a0a80ca4ff71625ef70efee5115a37eb3b697723))
* **api:** add a mutation to update pages ([8ead475](https://github.com/ArmandPhilippot/cretadoc/commit/8ead47578afdcd828e0448a7928124b0b08ccc51))
* **api:** add a node to list documentation directories ([0912001](https://github.com/ArmandPhilippot/cretadoc/commit/0912001c50b133b29c58cf3d9ad847bdf7b13e23))
* **api:** add a node to list documentation entries (files + dirs) ([cb756a3](https://github.com/ArmandPhilippot/cretadoc/commit/cb756a3c54f1e99c14092dafb8cf014d69ce6774))
* **api:** add a node to list documentation files ([b39ba5e](https://github.com/ArmandPhilippot/cretadoc/commit/b39ba5ed7f31268bdd1a1d2b7f7f59480a3ebff0))
* **api:** add a node to query a single documentation directory ([d8fb99b](https://github.com/ArmandPhilippot/cretadoc/commit/d8fb99b0755f078609d47e8c1e494cdd76a81931))
* **api:** add a node to query any documentation entry ([7945346](https://github.com/ArmandPhilippot/cretadoc/commit/79453464991f2bcc0bb5adafe729eb706f06901e))
* **api:** add a slug field for pages and doc entries ([7775d83](https://github.com/ArmandPhilippot/cretadoc/commit/7775d831f380a41cd97364e877a8dac523bcd15a))
* **api:** add node to query a documentation file by id or path ([ffa7666](https://github.com/ArmandPhilippot/cretadoc/commit/ffa766611bdc7aff177b43487f6f804c4003a298))
* **api:** add page query to schema ([b18e9dc](https://github.com/ArmandPhilippot/cretadoc/commit/b18e9dca7e98ba077297297197b31888aac25eb1))
* **api:** add pages query to schema to list pages ([f472c1f](https://github.com/ArmandPhilippot/cretadoc/commit/f472c1f69ebd45622ad9a0c9678f434244134b87))
* **api:** add pagination to directory contents ([d6b4d36](https://github.com/ArmandPhilippot/cretadoc/commit/d6b4d36390b3255c8dc265b17e7abff7d6ad1809))
* **api:** allow additional text contents for doc directories ([da1aeb8](https://github.com/ArmandPhilippot/cretadoc/commit/da1aeb80c327a892a32bb00f0fd13f79475e5728))
* **api:** allow page/doc file creation with meta ([5abaf3e](https://github.com/ArmandPhilippot/cretadoc/commit/5abaf3e8aa8f9ddd68b09ed1ea231cd076acecb1))
* **api:** allow querying doc root as doc entry ([8b45ed7](https://github.com/ArmandPhilippot/cretadoc/commit/8b45ed7274bfe7de749ee0ba6269e977d243f2bd))
* **api:** allow user to set directory metadata in a _meta file ([6a4557e](https://github.com/ArmandPhilippot/cretadoc/commit/6a4557e85ded0cb47ec94aea75577084282e5faa))
* **api:** allow user to update pages/doc file metadata ([35cec02](https://github.com/ArmandPhilippot/cretadoc/commit/35cec02eceaa3c971ee9989decea1dd3a0a3d438))
* **api:** create an API instance with GraphQL Yoga ([d703709](https://github.com/ArmandPhilippot/cretadoc/commit/d703709ebb7c2dc9ac2e769ac945a543360afd03))
* **api:** find doc entries using parent slug ([bb872e3](https://github.com/ArmandPhilippot/cretadoc/commit/bb872e3436c1e0ad309cb34f05edbcbbb334fdea))
* **api:** handle excerpt on pages and doc entries ([23c35bb](https://github.com/ArmandPhilippot/cretadoc/commit/23c35bbea47c12b7c50bf62598fa8e5ab27fc64b))
* **api:** query doc entry/file/directory by slug ([c3c65df](https://github.com/ArmandPhilippot/cretadoc/commit/c3c65df256d70c7d06f2a30bf061c51e027e5b41))
* **api:** remove nested pagination on documentation entries ([5c1da7e](https://github.com/ArmandPhilippot/cretadoc/commit/5c1da7e0803851c800fb0430af1415c7fe5fb4b6)), closes [#d6b4d36](https://github.com/ArmandPhilippot/cretadoc/issues/d6b4d36)
* **api:** replace relative links in markdown files ([69160fc](https://github.com/ArmandPhilippot/cretadoc/commit/69160fcc7b183c1f505f1467d65becc9e3bb4d61))
* **api:** retrieve frontmatter meta in pages and doc files ([569b2ad](https://github.com/ArmandPhilippot/cretadoc/commit/569b2add01c8117aade6bd6450f6a7a80e422030))


### Bug Fixes

* **api:** add config validation ([f237674](https://github.com/ArmandPhilippot/cretadoc/commit/f237674452cb288fada09cd51f5bda6735460dd1))
* **api:** correct hasNextPage value in PageInfo ([cca3f28](https://github.com/ArmandPhilippot/cretadoc/commit/cca3f28584ad272f9381f7a902f529518be645fd))
* **api:** do not use Simplify type on DocFile/DocDirectory/Page types ([86fc538](https://github.com/ArmandPhilippot/cretadoc/commit/86fc538e9bb722a1258c0468fdda537f20d0880a)), closes [#c999283](https://github.com/ArmandPhilippot/cretadoc/issues/c999283)
* **api:** export all types that can be useful for consumers ([bca5684](https://github.com/ArmandPhilippot/cretadoc/commit/bca5684183bbffc01d7f70bd7b2480c1a5d4d404))
* **api:** force createAPI return type to be APIInstance ([4180ee5](https://github.com/ArmandPhilippot/cretadoc/commit/4180ee5b657fe2cfd66cf5c78129ef231cdee276))
* **api:** make DocPayload generic ([a27d9d5](https://github.com/ArmandPhilippot/cretadoc/commit/a27d9d55f16aa197fccaf694a120ccc4a8da365c))
* **api:** make edges and pageInfo always defined ([26b3a0a](https://github.com/ArmandPhilippot/cretadoc/commit/26b3a0a2eefd6abd9724ef0233edc4fe26e7ba32))
* **api:** rename content key to contents ([ba21918](https://github.com/ArmandPhilippot/cretadoc/commit/ba21918c2dde3eea4ea5c54cc8452b3d425312ea))
* **api:** rename contents field on DocDirectory to entries ([34fda78](https://github.com/ArmandPhilippot/cretadoc/commit/34fda7898b769d89451aa6150608f02702603d7e))
* **api:** return correct edges when using offset in pagination ([2af7d6c](https://github.com/ArmandPhilippot/cretadoc/commit/2af7d6c56b55773c8ca167599ba9242e8bea1ff2))
* **api:** return empty contents when there is only front matter in file ([364724d](https://github.com/ArmandPhilippot/cretadoc/commit/364724d49c82a35c9bbb6f99ba35f5322e5f6367))
* **api:** use meta input to create/update doc directories meta ([8f84ac1](https://github.com/ArmandPhilippot/cretadoc/commit/8f84ac1ebe392c66fc397cf90a2a695a7e15c5f0))
