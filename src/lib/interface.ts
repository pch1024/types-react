export interface RouteType {
    key: string;
    name: string;
    component(props): JSX.Element;
}

