export type NonOptional<T> = { [k in keyof T]-?: T[k] };
