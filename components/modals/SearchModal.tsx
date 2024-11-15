"use client";

import { useSearchModal } from "@/hooks/useSearchModal";
import { useMemo, useState } from "react";
import { CountrySelectValue } from "@/types";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";
import qs from "query-string";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import DatePicker from "../inputs/DatePicker";
import Counter from "../inputs/Counter";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FiSearch } from "react-icons/fi";
import CountrySelect from "../inputs/CountrySelect";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const [locationValue, setLocationValue] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: undefined, // Start with no date selected
    endDate: undefined, // Start with no date selected
    key: "selection",
  });
  const [guestsCount, setGuestsCount] = useState(1);
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();
  const Map = useMemo(
    () => dynamic(() => import("../shared/Map"), { ssr: false }),
    [locationValue]
  );

  const handleSubmit = async () => {
    let currentQuery: any = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      guests: guestsCount,
      location: locationValue?.label,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );
    searchModal.onClose();
    router.push(url);
  };

  // Clear All functionality to reset the selected date range
  const handleClearAll = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
  };

  // Skip functionality to bypass the current step and move to the next step
  const handleSkip = () => {
    setStep((prevStep) => prevStep + 1); // Move to the next step
  };

  // Define the modal body content using the accordion
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Accordion
        type="single"
        collapsible
        value={step.toString()}
        onValueChange={(value) => {
          if (value) setStep(Number(value)); // Update step when the active accordion changes
        }}
      >
        {/* Where to Section */}
        <AccordionItem value={STEPS.LOCATION.toString()}>
          <AccordionTrigger className="text-xl text-black font-semibold">
            Where to?
          </AccordionTrigger>
          <AccordionContent>
            <CountrySelect
              value={locationValue}
              onChange={(value) =>
                setLocationValue(value as CountrySelectValue)
              }
            />
          </AccordionContent>
        </AccordionItem>

        {/* Date Section */}
        <AccordionItem value={STEPS.DATE.toString()}>
          <AccordionTrigger className="text-xl text-black font-semibold">
            When?
          </AccordionTrigger>
          <AccordionContent>
            <DatePicker
              value={dateRange}
              onChange={(value) => setDateRange(value.selection)}
            />
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={handleClearAll}
                className="text-blue-500 hover:underline"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="text-blue-500 hover:underline"
              >
                Skip
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Guests Section */}
        <AccordionItem value={STEPS.INFO.toString()}>
          <AccordionTrigger className="text-xl text-black font-semibold">
            Who?
          </AccordionTrigger>
          <AccordionContent>
            <Counter
              title="Guests"
              subtitle="How many guests are coming?"
              value={guestsCount}
              onChange={(value) => setGuestsCount(value)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title="Search"
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Search"
    />
  );
};

export default SearchModal;
