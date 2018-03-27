import {IStyleAPI, IStyleItem, IMatcherFunction, IComparatorFunction} from "import-sort-style";
import {readdirSync} from "fs";

const fixedOrder = ["react", "prop-types"];

export default function(styleApi: IStyleAPI): IStyleItem[] {
    const {
        alias,
        and,
        not,
        dotSegmentCount,
        hasNoMember,
        isAbsoluteModule,
        isNodeModule,
        isRelativeModule,
        moduleName,
        naturally,
        unicode,
        hasOnlyDefaultMember,
        hasOnlyNamedMembers,
    } = styleApi;

    const isScopedModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName[0] === "@");
    const isReactModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(react|prop-types|redux)/));
    const isCssModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/\.s?css$/));

    const isComponentModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(?:(?:~\/)|(?:\.{1,2}\/)*)components/));
    const isLibModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(?:(?:~\/)|(?:\.{1,2}\/)*)lib/));
    const isReduxModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(?:(?:~\/)|(?:\.{1,2}\/)*)redux/));
    const isSagaModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(?:(?:~\/)|(?:\.{1,2}\/)*)sagas/));
    const isServiceModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(?:(?:~\/)|(?:\.{1,2}\/)*)services/));
    const isStyleModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^(?:(?:~\/)|(?:\.{1,2}\/)*)styles/));
    const isRootModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^~\//));
    const isLocalModule: IMatcherFunction = (imported) =>
        Boolean(imported.moduleName.match(/^\.\//));

    const reactComparator: IComparatorFunction = (name1, name2) => {
        let i1 = fixedOrder.indexOf(name1);
        let i2 = fixedOrder.indexOf(name2);

        i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
        i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;

        return i1 === i2 ? naturally(name1, name2) : i1 - i2;
    };

    return [
        // import "foo"
        {match: and(hasNoMember, isAbsoluteModule, not(isRootModule))},
        {separator: true},

        // import "@foo/foo"
        {match: and(hasNoMember, isScopedModule)},
        {separator: true},

        // import "./foo"
        {match: and(hasNoMember, isRelativeModule, not(isCssModule))},
        {match: and(hasNoMember, isRootModule, not(isCssModule))},
        {separator: true},

        // import React from "react";
        {
            match: isReactModule,
            sort: moduleName(reactComparator),
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "fs";
        {
            match: isNodeModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import Component from "@components/Component.jsx";
        {
            match: isScopedModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import uniq from 'lodash/uniq';
        {
            match: and(isAbsoluteModule, hasOnlyDefaultMember, not(isRootModule)),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import { uniq } from 'lodash/uniq';
        {
            match: and(isAbsoluteModule, hasOnlyNamedMembers, not(isRootModule)),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import uniq from 'lodash/uniq';
        {
            match: and(isAbsoluteModule, not(isRootModule)),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../components/foo";
        {
            match: isComponentModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../lib/foo";
        {
            match: isLibModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../redux/foo";
        {
            match: isReduxModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../sagas/foo";
        {
            match: isSagaModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../services/foo";
        {
            match: isServiceModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../styles/foo";
        {
            match: isStyleModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "./foo";
        {
            match: isLocalModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import Component from "../foo";
        {
            match: and(isRelativeModule, not(isCssModule), hasOnlyDefaultMember),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import { Component } from "../foo";
        {
            match: and(isRelativeModule, not(isCssModule), hasOnlyNamedMembers),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../foo";
        {
            match: and(isRelativeModule, not(isCssModule)),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import Component from "../foo";
        {
            match: and(isRootModule, not(isCssModule), hasOnlyDefaultMember),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import { Component } from "../foo";
        {
            match: and(isRootModule, not(isCssModule), hasOnlyNamedMembers),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import … from "../foo";
        {
            match: and(isRootModule, not(isCssModule)),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},

        // import "./styles.css";
        {match: and(hasNoMember, isRelativeModule, isCssModule)},

        // import styles from "./Components.scss";
        {
            match: isCssModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        {separator: true},
        {separator: true},
    ];
}
