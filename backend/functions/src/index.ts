// Initialize the Admin App
import './app';
import { deleteLayout as _deleteLayout } from './layouts/delete-layout';
import { getLayout as _getLayout } from './layouts/get-layout';
import { getLayouts as _getLayouts } from './layouts/get-layouts';
import { postLayout } from './layouts/post-layout';

export const deleteLayout = _deleteLayout;
export const getLayout = _getLayout;
export const getLayouts = _getLayouts;
export const saveLayout = postLayout;
