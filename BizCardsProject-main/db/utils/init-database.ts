import { User } from "../model/user.model";
import { Card } from "../model/card.model";
import bcrypt from "bcrypt";

export const initDatabase = async () => {
  try {
    // Create and save Admin User
    const adminUser = new User({
      email: "admin@example.com",
      image: {
        alt: "Profile picture of Admin User",
        url: "https://example.com/images/admin.jpg",
      },
      isAdmin: true,
      name: {
        first: "Admin",
        last: "User",
      },
      password: await bcrypt.hash("Admin123!", 12),
      phone: "1111111111",
      address: {
        city: "Admin City",
        country: "USA",
        houseNumber: "1",
        state: "AS",
        street: "Admin St",
      },
    });

    const savedAdminUser = await adminUser.save();


    // Create and save Business User
    const businessUser = new User({
      email: "business@example.com",
      image: {
        alt: "Profile picture of Business User",
        url: "https://example.com/images/business.jpg",
      },
      isBusiness: true,
      name: {
        first: "Business",
        last: "User",
      },
      password: await bcrypt.hash("Businesspassword1!", 12),
      phone: "2222222222",
      address: {
        city: "Business City",
        country: "USA",
        houseNumber: "2",
        state: "BS",
        street: "Business St",
      },
    });

    const savedBusinessUser = await businessUser.save();


    // Create and save Regular User
    const regularUser = new User({
      email: "user@example.com",
      image: {
        alt: "Profile picture of Regular User",
        url: "https://example.com/images/user.jpg",
      },
      name: {
        first: "Regular",
        last: "User",
      },
      password: await bcrypt.hash("Userpassword1!", 12),
      phone: "3333333333",
      address: {
        city: "Regular City",
        country: "USA",
        houseNumber: "3",
        state: "RS",
        street: "Regular St",
      },
    });

    const savedRegularUser = await regularUser.save();


// Create and save Card 1
    const card1 = new Card({
      title: "Card 1 Title",
      subtitle: "Card 1 Subtitle",
      description: "Description for Card 1",
      phone: "1111111111",
      email: "card1@example.com",
      web: "https://card1website.com",
      image: {
        alt: "Image alt text for Card 1",
        url: "https://example.com/images/card1.jpg",
      },
      address: {
        city: "Cityville",
        country: "Countryland",
        houseNumber: 123,
        zip: 12345,
        state: "Stateville",
        street: "123 Main Street",
      },
      bizNumber: 123456789,
      likes: [],
      user_id: savedRegularUser._id
    });

    const savedCard1 = await card1.save();

// Create and save Card 2
    const card2 = new Card({
      title: "Card 2 Title",
      subtitle: "Card 2 Subtitle",
      description: "Description for Card 2",
      phone: "2222222222",
      email: "card2@example.com",
      image: {
        alt: "Image alt text for Card 2",
        url: "https://example.com/images/card2.jpg",
      },
      address: {
        city: "Townsville",
        country: "Countrytown",
        houseNumber: 456,
        zip: 54321,
        state: "Statetown",
        street: "456 Oak Avenue",
      },
      bizNumber: 234567890,
      likes: [],
      user_id: savedRegularUser._id
    });

    const savedCard2 = await card2.save();

// Create and save Card 3
    const card3 = new Card({
      title: "Card 3 Title",
      subtitle: "Card 3 Subtitle",
      description: "Description for Card 3",
      phone: "3333333333",
      email: "card3@example.com",
      web: "https://card3website.com",
      image: {
        alt: "Image alt text for Card 3",
        url: "https://example.com/images/card3.jpg",
      },
      address: {
        city: "Villagetown",
        country: "Countryvillage",
        houseNumber: 789,
        zip: 98765,
        state: "Statevillage",
        street: "789 Maple Street",
      },
      bizNumber: 345678901,
      likes: [],
      user_id: savedBusinessUser._id
    });

    const savedCard3 = await card3.save()


    return {
      adminUser: savedAdminUser,
      businessUser: savedBusinessUser,
      regularUser: savedRegularUser,
      cards: [savedCard1,savedCard2,savedCard3]

    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
