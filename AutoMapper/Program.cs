﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using Automapper.Entities;
using Automapper.Infrastructure;
using Automapper.Messages;
using Automapper.Repositories;
using AutoMapper;

// test commit 1
namespace Automapper
{
    class Program
    {
        static void Main(string[] args)
        {
            InitDatabase();

            var keyIn = ShowMenu();

            while (keyIn.Key != ConsoleKey.X)
            {
                //.. set up mappings
                if (keyIn.Key == ConsoleKey.NumPad1 || keyIn.Key == ConsoleKey.D1)
                {
                    MapSingleObjectNoParameters();
                }
                else if (keyIn.Key == ConsoleKey.NumPad2 || keyIn.Key == ConsoleKey.D2)
                {
                    MapSingleObjectWithParameters();
                }
                else if (keyIn.Key == ConsoleKey.NumPad3 || keyIn.Key == ConsoleKey.D3)
                {
                    MapListOfObjects();

                }

                keyIn = ShowMenu();
            }


        }

        private static void InitDatabase()
        {
            // Initialize database
            AppDomain.CurrentDomain.SetData("DataDirectory", System.IO.Directory.GetCurrentDirectory());
            Database.SetInitializer(new DemoInitialiser());
            DemoContext context = new DemoContext();
            context.Database.Initialize(true);
        }

        private static void MapListOfObjects()
        {
            var customerRepository = new CustomerRepository();
            var customers = customerRepository.ListAll();

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Customer, CustomerDto>()
                .BeforeMap((customer, customerDto, resContext) =>
                {
                    resContext.Items["CustomerType"] = customer.CustomerType;
                });

                cfg.CreateMap<Address, AddressDto>()
                    .ForMember(d => d.Residential,
                        o =>
                            o.ResolveUsing(
                                (src, dest, destMember, resContext) =>
                                    dest.Residential =
                                        (CustomerType)resContext.Items["CustomerType"] != CustomerType.Business))
                    ;
            });

            //..validate mappings   
            Mapper.AssertConfigurationIsValid();

            var customerDtos = Mapper.Map<List<CustomerDto>>(customers);
            foreach (var customerDto in customerDtos)
            {
                Console.WriteLine(customerDto.ToString());
                Console.WriteLine();
            }
        }

        private static void MapSingleObjectWithParameters()
        {
            var customerRepository = new CustomerRepository();
            var customer = customerRepository.FindById(1);

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Customer, CustomerDto>();

                cfg.CreateMap<Address, AddressDto>()
                    .ForMember(d => d.Residential,
                        o =>
                            o.ResolveUsing(
                                (src, dest, destMember, resContext) =>
                                    dest.Residential =
                                        (CustomerType)resContext.Items["CustomerType"] != CustomerType.Business))
                    ;
            });

            //..validate mappings
            Mapper.AssertConfigurationIsValid();

            var customerDto = Mapper.Map<CustomerDto>(customer,
                opts => opts.Items["CustomerType"] = customer.CustomerType);
            Console.WriteLine(customerDto.ToString());
        }

        private static void MapSingleObjectNoParameters()
        {
            var customerRepository = new CustomerRepository();
            var customer = customerRepository.FindById(1);

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Customer, CustomerDto>();

                cfg.CreateMap<Address, AddressDto>()
                    .ForMember(d => d.Residential, o => o.Ignore());
            });

            //..validate mappings
            Mapper.AssertConfigurationIsValid();

            var customerDto = Mapper.Map<CustomerDto>(customer);
            Console.WriteLine(customerDto.ToString());
        }

        private static ConsoleKeyInfo ShowMenu()
        {
            Console.WriteLine("----------------------");
            Console.WriteLine("1. Map single object without parameters");
            Console.WriteLine("2. Map single object with parameters");
            Console.WriteLine("3. Map multiple objects with parameters");
            Console.WriteLine("X. Exit");
            Console.WriteLine("----------------------");
            var keyIn = Console.ReadKey(true);
            return keyIn;
        }
    }
}
