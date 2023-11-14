import React from 'react';
import UserProvider  from "utils/ProviderContext";
import BasicProvider  from "utils/Provider/BasicProvider";

import { combineComponents } from './combineComponents';
const providers = [
    UserProvider,
    BasicProvider,
]
export const AppContextProvider = combineComponents(...providers);