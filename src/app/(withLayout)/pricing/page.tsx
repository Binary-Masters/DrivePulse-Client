import PricingCard from "@/Components/PricingCard/PricingCard";
import PageCover from "@/Components/Shared/PageCover/PageCover";
import img from '../../../assests/images/pricing.jpg'

const PricingPLan = () => {
    return (
        <div>
            <PageCover img={img} text={"Ultimate Offers"}/>
            <PricingCard/>
        </div>
    );
};

export default PricingPLan;