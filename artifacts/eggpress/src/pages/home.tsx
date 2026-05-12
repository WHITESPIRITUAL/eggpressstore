import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import EggCategories from "@/components/home/egg-categories";
import FreshnessPromise from "@/components/home/freshness-promise";
import MarketPrices from "@/components/home/market-prices";
import OrderTracking from "@/components/home/order-tracking";
import Subscription from "@/components/home/subscription";
import Testimonials from "@/components/home/testimonials";
import PickupDelivery from "@/components/home/pickup-delivery";
import Footer from "@/components/layout/footer";

import OrderModal from "@/components/modals/order-modal";
import TrackingModal from "@/components/modals/tracking-modal";
import SubscriptionModal from "@/components/modals/subscription-modal";

export default function Home() {
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isTrackingModalOpen, setTrackingModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState<"large" | "medium" | "small" | null>(null);

  const handleOpenOrder = (size?: "large" | "medium" | "small") => {
    if (size) setSelectedSize(size);
    setOrderModalOpen(true);
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden dark">
      <Navbar onTrackOrder={() => setTrackingModalOpen(true)} />
      
      <Hero 
        onOrder={() => handleOpenOrder()} 
        onTrack={() => setTrackingModalOpen(true)} 
      />
      
      <StatsBar />
      
      <div id="products">
        <EggCategories onSelect={handleOpenOrder} />
      </div>
      
      <div id="about">
        <FreshnessPromise />
      </div>
      
      <MarketPrices />
      
      <div id="track">
        <OrderTracking />
      </div>
      
      <Subscription onSubscribe={() => setSubscriptionModalOpen(true)} />
      
      <Testimonials />
      
      <div id="contact">
        <PickupDelivery />
      </div>
      
      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <OrderModal 
            isOpen={isOrderModalOpen} 
            onClose={() => setOrderModalOpen(false)} 
            initialSize={selectedSize}
          />
        )}
        {isTrackingModalOpen && (
          <TrackingModal 
            isOpen={isTrackingModalOpen} 
            onClose={() => setTrackingModalOpen(false)} 
          />
        )}
        {isSubscriptionModalOpen && (
          <SubscriptionModal 
            isOpen={isSubscriptionModalOpen} 
            onClose={() => setSubscriptionModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
