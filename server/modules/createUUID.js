const createUUID = () =>{
  let dateTime = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const randomSeed = (dateTime + Math.random() * 16) % 16 | 0;
    dateTime = Math.floor(dateTime / 16);
    return (c === 'x' ? randomSeed : (randomSeed & 0x3 | 0x8)).toString(16);
  });
};
module.exports = createUUID;
