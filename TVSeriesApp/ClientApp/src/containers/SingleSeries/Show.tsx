interface Show {
  name: string;
  premiered: string;
  rating: {
    average: number;
  };
  _embedded: {
    episodes: any[];
  };
  image: {
    medium: string;
  };
}

export default Show;
