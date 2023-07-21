import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async() =>{
  try {
    const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT || 3030;
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT,()=>{
      console.log(`Server ${PORT}-da ishga tushdi`);
      
    })
  } catch (error) {
    console.log(error);
    
    
  }
}
start();
