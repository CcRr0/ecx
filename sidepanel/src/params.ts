const params = new URLSearchParams(location.search);
export default params;

export const Id = Number(params.get("id"));
