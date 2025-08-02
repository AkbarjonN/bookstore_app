import { Faker, en, de, ja } from "@faker-js/faker";
import seedrandom from "seedrandom";
function getFaker(region) {
  switch (region) {
    case "de":
      return new Faker({ locale: [de] });
    case "ja":
      return new Faker({ locale: [ja] });
    case "us":
    default:
      return new Faker({ locale: [en] });
  }
}

export function generateBooks({ seed, page, region, likes, reviews }) {
  const faker = getFaker(region);
  const rng = seedrandom(`${seed}-${page}`);


  const likesNum = parseFloat(likes);
  const reviewsNum = parseFloat(reviews);

  const books = [];

  for (let i = 0; i < 20; i++) {
    const index = (page - 1) * 20 + i + 1;

    faker.seed(Math.floor(rng() * 1000000));

    let title;
    if (region === 'us'){
        title = faker.commerce.productName();
    }else{
        title = faker.lorem.words({min:2, max:4});
    }
    const isbn = faker.commerce.isbn();
    const authors = [faker.person.fullName()];
    const publisher = faker.company.name();

    const likeCount =
      Math.floor(likesNum) + (rng() < (likesNum % 1) ? 1 : 0);

    const reviewCount =
      Math.floor(reviewsNum) + (rng() < (reviewsNum % 1) ? 1 : 0);

    const reviewArray = Array.from({ length: reviewCount }, () => ({
      reviewer: faker.person.fullName(),
      text: faker.lorem.sentence(),
    }));
    books.push({
      index,
      isbn,
      title,
      authors,
      publisher,
      likes: likeCount,
      reviews: reviewArray,
    });
  }

  return books;
}


