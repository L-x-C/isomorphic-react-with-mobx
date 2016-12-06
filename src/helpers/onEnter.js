export default (renderProps, states) => {
    const params = renderProps.params;
    const query = renderProps.location.query;

    const onEnterMethods = renderProps.components.filter(c => c.onEnter).map(c => c.onEnter);

    return Promise.all(onEnterMethods.map(method => method({states, query, params})));
};
