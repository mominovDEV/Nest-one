import { User } from './../../users/models/user.model';
import { Model } from 'sequelize-typescript';
import { BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist';
import { Column, Table } from 'sequelize-typescript';

interface PostCreationAttrs{
    title:string;
    content:string;
    image:string;
    userId:number;
}

@Table({tableName:'posts'})

export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({example:'1',description:'Unikal ID'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number;

    @ApiProperty({example:'Post1',description:'Maqola Sarlavhasi'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    title:string;

    @ApiProperty({example:'Bu yerda maqola matni buladi',description:'Unikal ID'})
    @Column({
        type:DataType.TEXT,
        allowNull:false,
    })
    content:string;


    @ApiProperty({example:'rasm',description:'Maqola rasmi'})
    @Column({
        type:DataType.STRING,
    })
    image:string;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER, onDelete:'CASCADE'
    })
    userId:number;

    @BelongsTo(()=>User)
    author:User;
}
