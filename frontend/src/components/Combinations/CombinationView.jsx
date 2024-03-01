
import {CombinationEje1} from '@/components/Combinations/CombinationEje1'

import {CombinationEje2} from '@/components/Combinations/CombinationEje2'
import {CombinationBoard} from '@/components/Combinations/CombinationBoard'

import {CombinationEje3} from '@/components/Combinations/CombinationEje3'
import {CombinationEje4} from '@/components/Combinations/CombinationEje4'

import Board from '@/components/Combinations/dnd/board/Board'
import { generateQuoteMap } from './dnd/mockData';

export function CombinationView() {   
    
    const data = {
        medium: generateQuoteMap(10),
        large: generateQuoteMap(500),
      };

      //console.log(data.medium)
    
  return (
    
  <>
 
 {/* <CombinationEje1 />  */}

 <CombinationBoard />  

 {/* <Board initial={data.medium} withScrollableColumns />         */}
   
  </>

)
}





