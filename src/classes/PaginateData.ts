import { Entity, getRepository, FindManyOptions, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

export default class PaginateData {
    

    static async paginator(req: Request, entity: any, optinos?: FindManyOptions<any>, queryBuilderPersona?: SelectQueryBuilder<any>){
        
        
        const repository   = getRepository(entity);
        const page         = parseInt((req.body.page <= 0)? 1 : req.body.page)
        const limit        = parseInt(req.body.limit)
        const skip         = ((page - 1) * limit);

        let totalRecords: number = 0;
        let totalPages: number = 0;
        let data: any;

        if(queryBuilderPersona !== undefined){
            queryBuilderPersona.skip(skip)
            queryBuilderPersona.take(limit);
            //console.log('Paginador - queryBuilderPersona: ', queryBuilderPersona.getSql());

            totalRecords = await queryBuilderPersona.getCount();
            totalPages   = Math.ceil(totalRecords / limit);
            data = await queryBuilderPersona.getMany();
        }else{
            let finalOptions : FindManyOptions<any>;

            if(optinos !== undefined){
                finalOptions = optinos;
                finalOptions.skip = skip;
                finalOptions.take = limit;
                finalOptions.cache = true;
            }else{
                finalOptions = {
                    skip: skip,
                    take: limit
                }
            }
            
            totalRecords = await repository.count(finalOptions);
            totalPages   = Math.ceil(totalRecords / limit);
            console.log('finalOptions: ', finalOptions);
            data = await repository.find(finalOptions);
        }

        const result = {
            totalRecords,
            totalPages,
            page,
            skip,
            take: limit,
            data
        }

        return result;
    }

}