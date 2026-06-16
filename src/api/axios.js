// No-op axios stub — all backend connectivity has been removed.
// Returns empty resolved promises so any missed imports do not crash the app.
const noop = () => Promise.resolve({ data: [] });
const noopInstance = {
    get: noop,
    post: noop,
    put: noop,
    patch: noop,
    delete: noop,
    interceptors: { request: { use: () => { } }, response: { use: () => { } } },
};

export default noopInstance;
