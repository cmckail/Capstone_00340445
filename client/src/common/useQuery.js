/**
 * helper method to handle processing search queries
 * only used with search bar in market
 */
import { useLocation } from "react-router";
export const useQuery = () => new URLSearchParams(useLocation().search);

export default useQuery;