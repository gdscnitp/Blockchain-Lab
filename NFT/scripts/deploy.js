async function main(){
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed to address: ", myNFT.address);
  
}

main()
.then(() => process.exit(0))
.catch((error)=>{
  console.error(error);
  process.exit(1);
})

//0x5BD3D0c828a05451B0C2306737324bD394BA5174