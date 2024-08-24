export const commentData = [
  {
    id: "1",
    text: "Buy DogeCoins?",
    parentId: null,
    child: true,
    profile: { name: "Elon Musk", src: "https://i.redd.it/tm7ced4yniib1.jpg" },
  },
  {
    id: "2",
    text: "Hmmm... seems intersting?",
    parentId: "1",
    child: false,
    profile: {
      name: "Jack Ma",
      src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkJ1YuT4NeBxSO6Tss4Fg4HBrgJYiAnU74acifpzAJEAnHhNr9",
    },
  },
  {
    id: "3",
    text: "How many do you have?",
    parentId: "1",
    child: false,
    profile: {
      name: "Warren Buffett",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-iE_tQAmUGJ_4J4C3HTflkMD5C61GYkKgd7fP0-NhuoO9iPd",
    },
  },
  {
    id: "4",
    text: "A lot!",
    parentId: null,
    child: true,
    profile: {
      name: "Jeff Bezos",
      src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT56TmMRi1_9KnGuG1BTTxrL1YPKIkwNgD4_HW5yrPUtPcz2RUA",
    },
  },
  {
    id: "5",
    text: "Haha, I can relate :)",
    parentId: "4",
    child: true,
    profile: { name: "Elon Musk", src: "https://i.redd.it/tm7ced4yniib1.jpg" },
  },
  {
    id: "8",
    text: "Interesting!",
    parentId: "5",
    child: false,
    profile: {
      name: "Bill Gates",
      src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT2w_bADOkCd-crL7kYomj8CG7bvFyk3iFF_3iTaPp8B6UlQ5e1MB5kkpDrgqCjmRFPqftVfTpRvmL5Qt33ARxqj5FKwHZPBYgGBDOwxw",
    },
  },
];
