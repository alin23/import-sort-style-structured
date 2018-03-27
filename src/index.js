"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fixedOrder = ["react", "prop-types"];
function default_1(styleApi) {
    const { alias, and, not, dotSegmentCount, hasNoMember, isAbsoluteModule, isNodeModule, isRelativeModule, moduleName, naturally, unicode, hasOnlyDefaultMember, hasOnlyNamedMembers, } = styleApi;
    const modules = fs_1.readdirSync("./node_modules");
    const isScopedModule = (imported) => Boolean(imported.moduleName[0] === "@");
    const isFromNodeModules = (imported) => Boolean(modules.indexOf(imported.moduleName.split("/")[0]) !== -1);
    const isReactModule = (imported) => Boolean(imported.moduleName.match(/^(react|prop-types|redux)/));
    const isCssModule = (imported) => Boolean(imported.moduleName.match(/\.s?css$/));
    const isComponentModule = (imported) => Boolean(imported.moduleName.match(/^\.{1,2}\/components/));
    const isLibModule = (imported) => Boolean(imported.moduleName.match(/^\.{1,2}\/lib/));
    const isReduxModule = (imported) => Boolean(imported.moduleName.match(/^\.{1,2}\/redux/));
    const isSagaModule = (imported) => Boolean(imported.moduleName.match(/^\.{1,2}\/sagas/));
    const isServiceModule = (imported) => Boolean(imported.moduleName.match(/^\.{1,2}\/services/));
    const isStyleModule = (imported) => Boolean(imported.moduleName.match(/^\.{1,2}\/styles/));
    const isLocalModule = (imported) => Boolean(imported.moduleName.match(/^\.\//));
    const reactComparator = (name1, name2) => {
        let i1 = fixedOrder.indexOf(name1);
        let i2 = fixedOrder.indexOf(name2);
        i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
        i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;
        return i1 === i2 ? naturally(name1, name2) : i1 - i2;
    };
    return [
        // import "foo"
        { match: and(hasNoMember, isAbsoluteModule) },
        { separator: true },
        // import "./foo"
        { match: and(hasNoMember, isRelativeModule, not(isCssModule)) },
        { separator: true },
        // import React from "react";
        {
            match: isReactModule,
            sort: moduleName(reactComparator),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "fs";
        {
            match: isNodeModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import uniq from 'lodash/uniq';
        {
            match: and(isFromNodeModules, hasOnlyDefaultMember),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import { uniq } from 'lodash/uniq';
        {
            match: and(isFromNodeModules, hasOnlyNamedMembers),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import uniq from 'lodash/uniq';
        {
            match: isFromNodeModules,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import Component from "components/Component.jsx";
        {
            match: isAbsoluteModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import Component from "@components/Component.jsx";
        {
            match: isScopedModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../components/foo";
        {
            match: isComponentModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../lib/foo";
        {
            match: isLibModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../redux/foo";
        {
            match: isReduxModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../sagas/foo";
        {
            match: isSagaModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../services/foo";
        {
            match: isServiceModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../styles/foo";
        {
            match: isStyleModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "./foo";
        {
            match: isLocalModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import Component from "../foo";
        {
            match: and(isRelativeModule, not(isCssModule), hasOnlyDefaultMember),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import { Component } from "../foo";
        {
            match: and(isRelativeModule, not(isCssModule), hasOnlyNamedMembers),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import … from "../foo";
        {
            match: and(isRelativeModule, not(isCssModule)),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        // import "./styles.css";
        { match: and(hasNoMember, isRelativeModule, isCssModule) },
        // import styles from "./Components.scss";
        {
            match: isCssModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        { separator: true },
    ];
}
exports.default = default_1;
