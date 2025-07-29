import GradientSpot from "@/components/gradient_spot";

export default function CollegeNotes() {
  return (
    <>
      <div className="block pt-10 h-100">
        <div className="text-white mx-10">In Maintenance</div>
        <GradientSpot
          scale="scale-150"
          height="h-60"
          width="w-50 sm:w-140"
          gradient="2"
          tilt="rotate-15"
        ></GradientSpot>
      </div>
      <div className="pl-20 sm:pl-300 block">
        <GradientSpot
          scale="scale-150"
          height="h-50"
          width="w-50 sm:w-110"
          gradient="1"
          tilt="-rotate-15"
        ></GradientSpot>
      </div>
    </>
  );
}
