export interface NodeType {
    id?: string;
    name?: string;
    properties?: string[];
}

export interface AllNodeDataType {
    postgres?: NodeType[] | undefined;
    neo4j?: NodeType[] | undefined;
}
