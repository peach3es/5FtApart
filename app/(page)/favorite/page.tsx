'use client'
import React from 'react';
import { properties } from '@/components/Result/propertylistresult';
import {Card, CardBody, CardFooter, Image, Pagination} from "@nextui-org/react";

const favorite=()=>{

    return(
        <div>
            <div className="result-content p-5 grid grid-cols-3 gap-x-4 gap-y-8 mx-72">
        {properties.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            //onPress={handlePropertyClick}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[240px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* <div className="flex justify-center mb-5">
        <Pagination
          isCompact
          showControls
          total={Math.ceil(properties.length / itemsPerPage)}
          initialPage={1}
          color="warning"
          onChange={handlePageChange}
        />
      </div> */}
        </div>

    );



}

export default favorite;