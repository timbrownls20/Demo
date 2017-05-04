using System;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.Framework.Client;

namespace TFSTools.Actions
{
    public class SubscriptionAction: IAction
    {
        public void Execute(TfsTeamProjectCollection tpc)
        {
             //querying subscriptions
            //list current subscriptions
            IEventService eventService = tpc.GetService<IEventService>();
            Subscription[] subscriptions = eventService.GetAllEventSubscriptions();

            Console.WriteLine("There are {0} subscriptions:", subscriptions.Length);
            foreach (Subscription s in subscriptions)
            {
                Console.WriteLine();
                PrintSubscription(s);
                Console.WriteLine();
            }
        }

        
        private static void PrintSubscription(Subscription s)
        {
            Console.WriteLine("Subscription Id:    {0}", s.ID);
            Console.WriteLine("EventType:          {0}", s.EventType);
            Console.WriteLine("Subscriber:         {0}", s.Subscriber);
            Console.WriteLine("Delivery Address:   {0}", s.DeliveryPreference.Address);
            Console.WriteLine("Delivery Schedule:  {0}", s.DeliveryPreference.Schedule);
            Console.WriteLine("Delivery Type:      {0}", s.DeliveryPreference.Type);
            Console.WriteLine("Tag:                {0}", s.Tag);
            Console.WriteLine("Filter:             {0}", s.ConditionString);
        }

    }
}