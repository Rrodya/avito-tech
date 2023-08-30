export interface IGame {
    id:                          number;
    title:                       string;
    thumbnail:                   string;
    status?:                     string;
    short_description?:          string;
    description?:                string;
    game_url:                    string;
    genre:                       string;
    platform:                    string;
    publisher:                   string;
    developer:                   string;
    release_date:                string;
    freetogame_profile_url:      string;
    minimum_system_requirements?:MinimumSystemRequirements;
    screenshots?:                Screenshot[];
}

export interface MinimumSystemRequirements {
    os:        string;
    processor: string;
    memory:    string;
    graphics:  string;
    storage:   string;
}

export interface Screenshot {
    id:    number;
    image: string;
}

export interface IFilter {
    id: number;
    name: string;
    type?: string;
}

export interface IFilterItems {
    category: IFilter[];
    platform: IFilter[];
    tag: IFilter[];
}

export type sorting = "release-date" | "popularity" | "alphabetical";

