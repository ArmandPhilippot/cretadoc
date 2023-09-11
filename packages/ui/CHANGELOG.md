# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.1](https://github.com/ArmandPhilippot/cretadoc/compare/@cretadoc/ui@2.0.0...@cretadoc/ui@2.0.1) (2023-09-11)


### Bug Fixes

* **ui:** let consumers take care of building themes ([37247f8](https://github.com/ArmandPhilippot/cretadoc/commit/37247f8085ffe80539d4600f50168caa126c9c04))

## [2.0.0](https://github.com/ArmandPhilippot/cretadoc/compare/@cretadoc/ui@1.0.0...@cretadoc/ui@2.0.0) (2023-09-08)


### ⚠ BREAKING CHANGES

* **ui:** CSS files are no longer shipped with the package, you
should use Vanilla Extract plugin in your bundler

### build

* **ui:** prevent CSS compilation ([07caba7](https://github.com/ArmandPhilippot/cretadoc/commit/07caba7c0f4e122b35b890326013044cef76327b))

## 1.0.0 (2023-09-01)


### ⚠ BREAKING CHANGES

* **ui:** The UIContext/UIProvider couple has been replaced with
LinkContext/LinkProvider
* **ui:** the `buildThemes` helper is no longer exported.
* **ui:** the `themes` export is no longer an object but an
array of themes and the `Themes` type no longer exists.
* **ui:** the `maxWidth` attribute of Drawer component has been
removed.
* **ui:** useBodyScrollLock has been replaced with useScrollLock
* **ui:** expected parameter in useScrollbarWidth and
getScrollbarWidth has changed.
* **ui:** You need to provide an icon to the Collapsible
component.
* **ui:** Card component requires a heading.
* **ui:** `border.radius.round` have been renamed, you should
now use either `border.radius.circle` or `border.radius.pill`.
* **ui:** List component has now a nullable default spacing.
* **ui:** Field, FieldType and FieldProps have been removed
* **ui:** List component no longer controls the borders and
it accepts any kind of ReactNode as children. CardsList component no
longer has children, you should pass the cards in an items attribute.

* **ui:** remove Field component ([5c2ed60](https://github.com/ArmandPhilippot/cretadoc/commit/5c2ed603453ffd24a764a88937492aac8493c63e))


### Features

* **ui:** add a BackToTop component ([b3f57d4](https://github.com/ArmandPhilippot/cretadoc/commit/b3f57d4d519bcfccf8024cc63058f37fffe87fef))
* **ui:** add a Branding component ([b5a6124](https://github.com/ArmandPhilippot/cretadoc/commit/b5a61249927898cbc5d7627f21b600d5d9c539d7))
* **ui:** add a Breadcrumbs component ([b89ed25](https://github.com/ArmandPhilippot/cretadoc/commit/b89ed25f0e3f15ef56a09f177101822307191368))
* **ui:** add a Button component ([854a194](https://github.com/ArmandPhilippot/cretadoc/commit/854a1948cbdc6973352d4286c4f7954c56ebde1f))
* **ui:** add a ButtonLink component ([7f140b5](https://github.com/ArmandPhilippot/cretadoc/commit/7f140b5e057225309b9f3456bb91081d01466ee0))
* **ui:** add a Card component ([018e6e4](https://github.com/ArmandPhilippot/cretadoc/commit/018e6e4b513e65960bdc8fc2c7d805efedbbd75b))
* **ui:** add a CardsList component ([59573ca](https://github.com/ArmandPhilippot/cretadoc/commit/59573cadfab9ab53b84b7ba760a6cf94b744df91))
* **ui:** add a Collapsible component ([ceb9bec](https://github.com/ArmandPhilippot/cretadoc/commit/ceb9bec45c70f7e82a10c53f3709cd00df4fa0ce))
* **ui:** add a Colophon component ([68cdd39](https://github.com/ArmandPhilippot/cretadoc/commit/68cdd39314ac348dc08f2845ca435a4da0f0ec7e))
* **ui:** add a components provider to replace link component ([bec6024](https://github.com/ArmandPhilippot/cretadoc/commit/bec60249c6f0f91f73aedfb67df5a70c9adaecfd))
* **ui:** add a Drawer component ([531823e](https://github.com/ArmandPhilippot/cretadoc/commit/531823e313c17497f8e17686df7e5abf68322b1a))
* **ui:** add a Fieldset component ([356054e](https://github.com/ArmandPhilippot/cretadoc/commit/356054e4bf43307e24deaac5a7c00dfbd88dcab2))
* **ui:** add a Form component ([0e65e52](https://github.com/ArmandPhilippot/cretadoc/commit/0e65e522d20a35b2cd5dd9cd7e5db11385100397))
* **ui:** add a Heading component ([e16ed18](https://github.com/ArmandPhilippot/cretadoc/commit/e16ed1866ca9875b2d38133d68f3c77c951d9f5e))
* **ui:** add a helper for theme creation to build the shadows ([8d9f14e](https://github.com/ArmandPhilippot/cretadoc/commit/8d9f14e4b0e734e29c52ba901417101ebd48caef))
* **ui:** add a helper function to build themes ([3e6431c](https://github.com/ArmandPhilippot/cretadoc/commit/3e6431c142eb56117c40142cbfa946fd23dc4252))
* **ui:** add a hook to retrieve scroll position ([38140bc](https://github.com/ArmandPhilippot/cretadoc/commit/38140bcd7e123ae08f58271459e140054b5ba4ae))
* **ui:** add a Label component ([476c39b](https://github.com/ArmandPhilippot/cretadoc/commit/476c39bc7c1d0ed6302a1d29a23973ccf3e5c9aa))
* **ui:** add a LabelledField component ([ab82e58](https://github.com/ArmandPhilippot/cretadoc/commit/ab82e585bcd6c2ab4a6310239a69e379c2da2e6a))
* **ui:** add a Layout component ([855379d](https://github.com/ArmandPhilippot/cretadoc/commit/855379d05d457eb34c7d52cbb7097d00461aec0c))
* **ui:** add a Legend component ([f0c059d](https://github.com/ArmandPhilippot/cretadoc/commit/f0c059d53125335add9a03ab7437f8d352544785))
* **ui:** add a Link component ([44c3949](https://github.com/ArmandPhilippot/cretadoc/commit/44c394900cde21b69558413513efb593f6e3e8f2))
* **ui:** add a List component ([0a92716](https://github.com/ArmandPhilippot/cretadoc/commit/0a9271682de3aa1dacf1fffe299022d608537b0e))
* **ui:** add a ListItem component ([defa6eb](https://github.com/ArmandPhilippot/cretadoc/commit/defa6eb15f8dec8b9b5efa2bd9953cafbe9e22f3))
* **ui:** add a MainNav component ([c0e532c](https://github.com/ArmandPhilippot/cretadoc/commit/c0e532ce011d059d5ab8ac97a23fe474cd251728))
* **ui:** add a Meta component ([718073a](https://github.com/ArmandPhilippot/cretadoc/commit/718073adf0725ab79b6d5437b92e46c27e25497d))
* **ui:** add a NavItem component ([9f4ae4f](https://github.com/ArmandPhilippot/cretadoc/commit/9f4ae4fa677dce0b32063a833bbd52badec42034))
* **ui:** add a NavLink component ([6f2f3bf](https://github.com/ArmandPhilippot/cretadoc/commit/6f2f3bf77c192ee95c0e02c4388b914c293ceb94))
* **ui:** add a NavList component ([32f26dd](https://github.com/ArmandPhilippot/cretadoc/commit/32f26ddda5b2eab9fae71a0d5301c4396e650cef))
* **ui:** add a Pagination component ([32d4005](https://github.com/ArmandPhilippot/cretadoc/commit/32d4005247367602f61a9e19b998abd6d7d99f65))
* **ui:** add a RadioGroup component ([74c489a](https://github.com/ArmandPhilippot/cretadoc/commit/74c489a71b0a73b4f2212172d35fc8fb9a5d1799))
* **ui:** add a Search icon ([f510652](https://github.com/ArmandPhilippot/cretadoc/commit/f51065217786c5bcdc40526ad625e8097ffa06d6))
* **ui:** add a SearchForm component ([51dc401](https://github.com/ArmandPhilippot/cretadoc/commit/51dc401c2b91f7de5583a4439f5aba31db5d2d67))
* **ui:** add a Select component ([a5cf8c7](https://github.com/ArmandPhilippot/cretadoc/commit/a5cf8c725d0b23ff41dbfd88040a85242b1c8bd2))
* **ui:** add a SkipTo component ([43ded0c](https://github.com/ArmandPhilippot/cretadoc/commit/43ded0c2b22899492395b453b3f4baa019f817dc))
* **ui:** add a Spinner component ([330bc3d](https://github.com/ArmandPhilippot/cretadoc/commit/330bc3d51d8244a5f0a2fe1e6834751162ea0e66))
* **ui:** add a Switch component ([da651db](https://github.com/ArmandPhilippot/cretadoc/commit/da651db45ecaae31caa979e847d6064fa01deb6d))
* **ui:** add a TableOfContents component ([52b4515](https://github.com/ArmandPhilippot/cretadoc/commit/52b4515b76bf4e8738e982110da5bc404404ebc8))
* **ui:** add a TextArea component ([e6045f5](https://github.com/ArmandPhilippot/cretadoc/commit/e6045f5bc88b00862fb6479c7c7875ddb1db2b37))
* **ui:** add a ToggleGroup component ([f626cfb](https://github.com/ArmandPhilippot/cretadoc/commit/f626cfbe8d57c2c8b84b4e9b53368eea01dd0f0d))
* **ui:** add a ToggleItem component ([924b5f4](https://github.com/ArmandPhilippot/cretadoc/commit/924b5f4f6885f8565d80c5903a669101a09e3e61))
* **ui:** add a Truncate component ([4373805](https://github.com/ArmandPhilippot/cretadoc/commit/43738050f46a131ab6ff3b804b245b0d4ad61328))
* **ui:** add a useBoolean hook ([a30ac89](https://github.com/ArmandPhilippot/cretadoc/commit/a30ac896cd6ccbfaed450168dbb3fe4bd2558026))
* **ui:** add a useToggle hook ([b275a5f](https://github.com/ArmandPhilippot/cretadoc/commit/b275a5f7dc845b649fffa6943adfbcd60a0a6137))
* **ui:** add a useVisuallyHidden hook ([c056091](https://github.com/ArmandPhilippot/cretadoc/commit/c056091c8f8a53cbb5493f85e166c2eae7de5880))
* **ui:** add a VisuallyHidden component ([714c8e7](https://github.com/ArmandPhilippot/cretadoc/commit/714c8e7663feb3cae4447fb6e1f9d2a0006bfdb6))
* **ui:** add an alignment attribute to NavList component ([c1561bb](https://github.com/ArmandPhilippot/cretadoc/commit/c1561bb3b96fefc842fcb20c458089755329d5ad))
* **ui:** add an angle shape to Icon component ([4f1ea93](https://github.com/ArmandPhilippot/cretadoc/commit/4f1ea939085f92c75865c9a7808b1d0c3e1ca8ac))
* **ui:** add an animationSpeed attribute to Icon component ([a5f3dc3](https://github.com/ArmandPhilippot/cretadoc/commit/a5f3dc3ee9c4bb538ae1c7cceea155ee3080d616))
* **ui:** add an Article component ([2180974](https://github.com/ArmandPhilippot/cretadoc/commit/218097421170f68b870868b679451d7415e212b9))
* **ui:** add an Aside component ([ab84761](https://github.com/ArmandPhilippot/cretadoc/commit/ab84761e67f5e9a4b207211519d74f92870bba93))
* **ui:** add an Icon component with hamburger shape ([4a5b80f](https://github.com/ArmandPhilippot/cretadoc/commit/4a5b80fddc97f6db35b43241c9192d93e2c11cf8))
* **ui:** add an Img component ([43959c8](https://github.com/ArmandPhilippot/cretadoc/commit/43959c8598191f3e400d4bde604481a7da97ba37))
* **ui:** add an Input component ([9c608c7](https://github.com/ArmandPhilippot/cretadoc/commit/9c608c7925d5f5f6db3994027efce450cebd9984))
* **ui:** add an option to make ordered lists hierarchical ([8d78430](https://github.com/ArmandPhilippot/cretadoc/commit/8d78430b40e29830e367881d49e72b4253c19182))
* **ui:** add an option to visually hide the LabelledField label ([5486fc8](https://github.com/ArmandPhilippot/cretadoc/commit/5486fc82e4789f4ee45b5091c16abbab5ce50335))
* **ui:** add an Overlay component ([d250dc1](https://github.com/ArmandPhilippot/cretadoc/commit/d250dc19f85254b52511f1776577d10dd74f9357))
* **ui:** add animation tokens to theme contract ([cd3c943](https://github.com/ArmandPhilippot/cretadoc/commit/cd3c943cfe68df9b4125794010f0921a0160b59c))
* **ui:** add borders to theme contract ([0649ef2](https://github.com/ArmandPhilippot/cretadoc/commit/0649ef214c6e75dbbd6080163b7bcf62a8916c74))
* **ui:** add Checkbox and Radio components ([723bd57](https://github.com/ArmandPhilippot/cretadoc/commit/723bd57636942b80a9405249208ecff1a80ab358))
* **ui:** add cross shape to Icon component ([03334d4](https://github.com/ArmandPhilippot/cretadoc/commit/03334d4a1f63095a86bb664f938d69accd7f1173))
* **ui:** add DescriptionList, Description, Term & Group components ([cb5b754](https://github.com/ArmandPhilippot/cretadoc/commit/cb5b7547e826b14824855a68b39b740284010a34))
* **ui:** add fonts to theme contract ([d62c2bc](https://github.com/ArmandPhilippot/cretadoc/commit/d62c2bcde2d9fbd72cf907c44f81be7f7d341105))
* **ui:** add icon sizes tokens to theme contract ([d991d0f](https://github.com/ArmandPhilippot/cretadoc/commit/d991d0f42d213caf97ec6d17ca35c248c26a999c))
* **ui:** add Moon and Sun icons ([acfc9ec](https://github.com/ArmandPhilippot/cretadoc/commit/acfc9ecba043d4b13c29e246d0844df20df79b78))
* **ui:** add shadows tokens to theme contract ([830a91b](https://github.com/ArmandPhilippot/cretadoc/commit/830a91b83cfcbbdf1162008c0de7caf91bb8a606))
* **ui:** add SizeTokens to themes ([ac5c0fe](https://github.com/ArmandPhilippot/cretadoc/commit/ac5c0fe47a007efd52e914df6d01dae19695622f))
* **ui:** add some layout components - Header, Nav, Footer & Main ([ca59852](https://github.com/ArmandPhilippot/cretadoc/commit/ca5985261997c7d391fa97ac66ec6595a6c1ec4a))
* **ui:** add spacings to theme contract ([0ed34e8](https://github.com/ArmandPhilippot/cretadoc/commit/0ed34e8dc35f1cf52c658d5f83395db1859e7c92))
* **ui:** add template for Wiki pages ([b12d071](https://github.com/ArmandPhilippot/cretadoc/commit/b12d07161adbf3f6c48f2e5926f02b4c63c4fb00))
* **ui:** add templates for Homepage and a Wiki index ([0116a2c](https://github.com/ArmandPhilippot/cretadoc/commit/0116a2c4748fe2853222984fb8e8344aeda7bd4d))
* **ui:** add useBodyScrollLock hook ([e07e7e9](https://github.com/ArmandPhilippot/cretadoc/commit/e07e7e9d1370a2e1a57807385887b87d40642ef0))
* **ui:** add useHeadingsTree hook ([51698ac](https://github.com/ArmandPhilippot/cretadoc/commit/51698ac389f6a57ebe696a901b147bbcbf36b838))
* **ui:** add useMatchMedia hook ([e3ab7f2](https://github.com/ArmandPhilippot/cretadoc/commit/e3ab7f2bd032b17ac2ae1c5092879b070f8b9840))
* **ui:** add useScrollbarWidth hook and getScrollbarWidth helper ([2308430](https://github.com/ArmandPhilippot/cretadoc/commit/230843011b2cfd516020d87b1b451728afe6ef71))
* **ui:** add useViewportSize hook ([a26993c](https://github.com/ArmandPhilippot/cretadoc/commit/a26993cb9d32c078edf00651b7775c3aba300412))
* **ui:** allow animated Overlay component ([e89c35d](https://github.com/ArmandPhilippot/cretadoc/commit/e89c35dfe198579d6cd1c292afed725adb8c2a69))
* **ui:** allow bordered NavItem components ([2cc49db](https://github.com/ArmandPhilippot/cretadoc/commit/2cc49db3e2167b6bf79031847d59f0c45aa1a63a))
* **ui:** allow label truncation in breadcrumbs ([399ee19](https://github.com/ArmandPhilippot/cretadoc/commit/399ee194c2a92c2f9e547e808c6bd7601f462976))
* **ui:** collapse breadcrumbs items when they are too many ([12c94cb](https://github.com/ArmandPhilippot/cretadoc/commit/12c94cb9215947bc33cb34dcc600c47cf76902d5))
* **ui:** export dark/light themes separately ([a1fbeda](https://github.com/ArmandPhilippot/cretadoc/commit/a1fbeda135e5e03950cee853bc72d06a8202cee4))
* **ui:** init themes contract with colors tokens ([f87b6d7](https://github.com/ArmandPhilippot/cretadoc/commit/f87b6d705f5757bfc8cb92248d5feda7a4aff67a))
* **ui:** init themes library with cretadoc default theme ([10008e2](https://github.com/ArmandPhilippot/cretadoc/commit/10008e2c99663296c963fd54afd1d4d17aa0f778))
* **ui:** let themes control the sidebar maximum width ([976d0f0](https://github.com/ArmandPhilippot/cretadoc/commit/976d0f0d50b98aa884eeb688be0f32dab8d54f86))
* **ui:** replace Input and TextArea with a generic Field component ([9e778ca](https://github.com/ArmandPhilippot/cretadoc/commit/9e778ca7107ff3024311ca0c5a677017e91ca27f))
* **ui:** replace UIContext with LinkContext ([46b4fee](https://github.com/ArmandPhilippot/cretadoc/commit/46b4fee245e629b1b5528167e5b83f7ec615d414))
* **ui:** replace useBodyScrollLock with useScrollLock ([1e0d608](https://github.com/ArmandPhilippot/cretadoc/commit/1e0d608b137a8b4248fe5ccbe38aab16e1db17b8))
* **ui:** support collapsible NavItems ([7c81f62](https://github.com/ArmandPhilippot/cretadoc/commit/7c81f62c6721ce25d631207ce7e3b7c401cbd761))
* **ui:** update cretadoc theme with real values ([fd7f127](https://github.com/ArmandPhilippot/cretadoc/commit/fd7f12721d37f24322473399a71ce8a2c8492435))
* **ui:** use themes contract to set the Drawer max width ([6c03f61](https://github.com/ArmandPhilippot/cretadoc/commit/6c03f6120e39b9bd42530489356ec87133f51b20))


### Bug Fixes

* **ui:** accept ref on Button and Link components ([5391e7b](https://github.com/ArmandPhilippot/cretadoc/commit/5391e7beea5e9fee132d2b2c77e6cc6863604487))
* **ui:** add an attribute to set an aria label to NavLink from NavItem ([d00a662](https://github.com/ArmandPhilippot/cretadoc/commit/d00a662b965ddf9e54c831bdcf30f95c08fbc7ea))
* **ui:** add an outline to selected switch item when focused ([4af857c](https://github.com/ArmandPhilippot/cretadoc/commit/4af857cc68a876f08e78ba4fe495afd72f0b2dda))
* **ui:** add aria-current attribute if NavLink is selected ([1aca141](https://github.com/ArmandPhilippot/cretadoc/commit/1aca141d43e4cf3799bfb7491ddb1460025e6e0d))
* **ui:** add design token for border radius used for pills ([bf7570e](https://github.com/ArmandPhilippot/cretadoc/commit/bf7570e910fe6ba7c8617e55fa8f638c061328d3))
* **ui:** add focus styles on ToggleItem component ([4c7dab2](https://github.com/ArmandPhilippot/cretadoc/commit/4c7dab2cef0c071328b6173098ed7ae3db0c35ea))
* **ui:** add semantic to Card component ([ea9aee0](https://github.com/ArmandPhilippot/cretadoc/commit/ea9aee0238f0eb8e0841b3c583ff13457e3dc441))
* **ui:** adjust cretadoc themes values ([e711521](https://github.com/ArmandPhilippot/cretadoc/commit/e711521eac87f1253edbf201080477af4fae34b1))
* **ui:** adjust padding on story containers in Storybook ([9644f69](https://github.com/ArmandPhilippot/cretadoc/commit/9644f69c06d5685cccf433c6ce3be269c88c68e8))
* **ui:** allow a nullable wrapper in useHeadingsTree hook ([8a8859c](https://github.com/ArmandPhilippot/cretadoc/commit/8a8859cecc04d5d232ce0b4431a36e306eba5b63))
* **ui:** allow consumer to style Collapsible parts ([cf101b7](https://github.com/ArmandPhilippot/cretadoc/commit/cf101b7fb47a082ff87e64e0960c6bf0aa606ce5))
* **ui:** allow primary color on list items borders ([ac04dc7](https://github.com/ArmandPhilippot/cretadoc/commit/ac04dc73b20df2bac3ca57124a498d1bb37e8755))
* **ui:** allow ref on Article component ([0479afc](https://github.com/ArmandPhilippot/cretadoc/commit/0479afce64353a7668bf9ed2cb80aea3a64e2fda))
* **ui:** apply correct CSS variable on color attribute ([b4414f0](https://github.com/ArmandPhilippot/cretadoc/commit/b4414f059e00d546992af7cb17daf4ca32a90fe0))
* **ui:** avoid fragile code using legacy React APIs ([38dcf44](https://github.com/ArmandPhilippot/cretadoc/commit/38dcf445d76f0bc8bfe14d193b350e88fe3bd78e))
* **ui:** change marker position for inlined list with marker ([889b436](https://github.com/ArmandPhilippot/cretadoc/commit/889b436c20ff352d0823ee8329febe2d0ed801b7)), closes [#278237](https://github.com/ArmandPhilippot/cretadoc/issues/278237)
* **ui:** close MainNav when focus is outside ([1719707](https://github.com/ArmandPhilippot/cretadoc/commit/1719707fae58fb9f3f1291bdce95b37b0715f7fb))
* **ui:** export themes contract ([c35ab7c](https://github.com/ArmandPhilippot/cretadoc/commit/c35ab7ccf5b215bc6f7057bf11df0e6fa9081667))
* **ui:** extract nav element from NavList component ([00226ca](https://github.com/ArmandPhilippot/cretadoc/commit/00226ca2ed65e74b1b75d8d2c97a9a0cf6ecf0f1))
* **ui:** improve Drawer & MainNav accessibility ([96f4144](https://github.com/ArmandPhilippot/cretadoc/commit/96f41449289882231075c7a450b30acb683b6064))
* **ui:** make exported themes readonly ([16fd2da](https://github.com/ArmandPhilippot/cretadoc/commit/16fd2da42bbb6d79daabb68fe24c7ec81908deb3))
* **ui:** make id and name mandatory on Field component ([1b94bed](https://github.com/ArmandPhilippot/cretadoc/commit/1b94bedcf1e2126c67e261a691d0f6a25ac22114))
* **ui:** make link anchor mandatory ([590bc95](https://github.com/ArmandPhilippot/cretadoc/commit/590bc95532ed0b79e34f84a75d549cc3d08c79a0))
* **ui:** make List spacing nullable ([278237e](https://github.com/ArmandPhilippot/cretadoc/commit/278237e718277e694b3930a100b706dbaed11429))
* **ui:** prevent additional spacing between cards in CardsList ([775d54d](https://github.com/ArmandPhilippot/cretadoc/commit/775d54dbc3ed81d3516eae06de426101bfa10694))
* **ui:** prevent error because of window in useScrollLock hook ([1e674da](https://github.com/ArmandPhilippot/cretadoc/commit/1e674da49cd3046d5571f4de29814f89c889d8ce))
* **ui:** prevent focus inside closed Drawer ([6311bb8](https://github.com/ArmandPhilippot/cretadoc/commit/6311bb83362cb085829a93a7935047e534ef5762))
* **ui:** prevent window is not defined error with useScrollPosition ([bc3c440](https://github.com/ArmandPhilippot/cretadoc/commit/bc3c440dbfd67bf9aecd395d105ef866da4ff9c3))
* **ui:** preview primary color on colors page ([3d02987](https://github.com/ArmandPhilippot/cretadoc/commit/3d02987201cdff243b6b102af021764c4c36888e))
* **ui:** remove children attribute from Branding component ([be19388](https://github.com/ArmandPhilippot/cretadoc/commit/be193881e26a9d1b8eef23559922425d2b18d59c)), closes [#590bc95](https://github.com/ArmandPhilippot/cretadoc/issues/590bc95)
* **ui:** remove default padding on bordered list items ([052a406](https://github.com/ArmandPhilippot/cretadoc/commit/052a40662aed8475e987e5fd7c513c433a9a03e8))
* **ui:** remove empty CSS vars from style prop ([d2aa2bb](https://github.com/ArmandPhilippot/cretadoc/commit/d2aa2bb8293a87840aab4e35d978f7ee6b12c02d))
* **ui:** remove extra container on SkipTo buttons ([c453ebe](https://github.com/ArmandPhilippot/cretadoc/commit/c453ebe33adb3a6ed63b412f24eedf29cc009d97))
* **ui:** remove interved foreground tokens ([d2b8db0](https://github.com/ArmandPhilippot/cretadoc/commit/d2b8db0fc1ba98871b2fc87b56ff5bfccf72f74f))
* **ui:** replace border radius tokens in Borders stories ([a919813](https://github.com/ArmandPhilippot/cretadoc/commit/a919813fed8e5c8c4cb27a5c03a19ac7f9055f3d))
* **ui:** restrict type attribute of Input component ([8ad82ac](https://github.com/ArmandPhilippot/cretadoc/commit/8ad82aca98ca5183be85edc876c18d62a323d686))
* **ui:** set correct variable when foreground is inverted ([73a8c0b](https://github.com/ArmandPhilippot/cretadoc/commit/73a8c0b526f84ccb4f618e1d6c1af20b180205db))
* **ui:** ship builded themes ([35b0d12](https://github.com/ArmandPhilippot/cretadoc/commit/35b0d1278ab13d16ef511333c86b7a2ad02c6948))
* **ui:** use consumer default value in Select if no placeholder ([bf18f7f](https://github.com/ArmandPhilippot/cretadoc/commit/bf18f7f59c7b9b168cebe9d8b6d64eaad802152b))
* **ui:** use foreground colors on description list term ([ee9d1d0](https://github.com/ArmandPhilippot/cretadoc/commit/ee9d1d0e976314a4840b6c5dd7b3e6a5e6389e3b))
* **ui:** use React ref as useScrollbarWidth parameter ([3a4523e](https://github.com/ArmandPhilippot/cretadoc/commit/3a4523ecdcfe1d232df0941d7af7db8875e1e528))
