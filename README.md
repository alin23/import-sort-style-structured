# import-sort-style-structured

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules.

```js
// Absolute modules with side effects (not sorted because order may matter)
import "a";
import "c";
import "b";

// Relative modules with side effects (not sorted because order may matter)
import "./a";
import "./c";
import "./b";

// Modules from the React eco-system (react, prop-types, redux modules) library sorted by name
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Modules from the Node.js "standard" library sorted by name
import {readFile, writeFile} from "fs";
import * as path from "path";

// Third-party modules sorted by name and grouped by named/default members
import aa from "aa";
import bb from "bb";
import cc from "cc";

import { aa, ab } from "aa";
import { bb, bc } from "bb";
import { cc, cd } from "cc";

import aa, { bb } from "aa";
import bcd, { bb, bc } from "bb";

// First-party modules grouped by predefined scopes
import Button from '../components/Button'
import Nav from '../components/Nav'

import { toTitleCase } from '../lib/str'
import authorize from '../lib/auth'

import HomepageActions from '../redux/home'
import LoginActions from '../redux/login'

import { fetchThings } from '../sagas/home'
import { requestAuthorization } from '../sagas/login'

import GithubAPI from '../services/github'
import FacebookAPI from '../services/facebook'

import colors from '../styles/colors'
import icons from '../styles/icons'

// Modules from the same directory are separated
import aaaaa from "./aaaaa";
import bbbbb from "./bbbbb";

// Other first-party modules are sorted by "relative depth" and then by name
import aaa from "../../aaa";
import bbb from "../../bbb";
import aaaa from "../aaaa";
import bbbb from "../bbbb";

// First-party styles modules sorted by "relative depth" and then by name
import styles from "./Component.scss";
```
