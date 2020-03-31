interface IStringMap {
    [key: string]: string;
}

export const ApiPaths: IStringMap = {
    getLayouts: 'https://us-central1-tovala-pete-fb.cloudfunctions.net/getLayouts',
    deleteLayout: 'https://us-central1-tovala-pete-fb.cloudfunctions.net/deleteLayout',
    saveLayout: 'https://us-central1-tovala-pete-fb.cloudfunctions.net/saveLayout'
};
