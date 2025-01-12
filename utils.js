const parseP4InfoText = (text) => {
    const stack = [];
    const result = {};
    let current = result;

    text.split("\n").forEach((line) => {
        line = line.trim();
        if (line.endsWith("{")) {
            const key = line.replace("{", "").trim();
            const obj = {};
            if (key === "preamble" || key === "type_info" || key === "pkg_info") {
                current[key] = obj;
            } else {
                current[key] = current[key] ? [...current[key], obj] : [obj];
            }
            stack.push(current);
            current = obj;
        } else if (line.endsWith("}")) {
            current = stack.pop();
        } else if (line.includes(":")) {
            const [key, value] = line.split(":").map((s) => s.trim());
            current[key] = value.replace(/"/g, "");
        }
    });

    return result;
};

export { parseP4InfoText };
