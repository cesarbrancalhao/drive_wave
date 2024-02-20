"use client";

import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { calculateCarPrice, calculateCarRent } from "@/constants";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const { city_mpg, year, make, model, transmission, drive, combination_mpg, displacement, cylinders } = car;

    const carPrice = calculateCarPrice(city_mpg, year, combination_mpg, displacement, transmission, cylinders);
    const carRent = calculateCarRent(city_mpg, year, transmission);

  return (

    <div className="car-card group">
        <div className="car-card__content">
            <h2 className="car-card__content-title">
                {make} {model}
            </h2>
        </div>

        <p className="flex mt-4 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">
                $
            </span>
            {carPrice}
        </p>

        <p className="self-start text-[13px] font-medium">
                or $ {carRent} /day
        </p>

        <div className="relative w-full h-40 my-3 object-contain">
            <Image src="/hero.png" alt="Car model" fill priority className="object-contain" />
        </div>

        <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/steering-wheel.svg" width={20} height={20} alt="Steering wheel" />
                    <p className="text-[14px]">{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/tire.svg" width={20} height={20} alt="Tire" />
                    <p className="text-[14px]">{drive.toUpperCase()}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/gas.svg" width={20} height={20} alt="Gas" />
                    <p className="text-[14px]">{combination_mpg} MPG</p>
                </div>
            </div>

            <div className="car-card__btn-container">
                <CustomButton
                    title="View More"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={() => setIsOpen(true)} />
            </div>
        </div>

        <CarDetails 
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            car={car} />
        
    </div>
  )
}

export default CarCard