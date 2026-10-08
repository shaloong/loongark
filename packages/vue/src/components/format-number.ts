import {defineComponent, computed, type PropType} from "vue";
import {useLocaleContext,DEFAULT_LOCALE} from "@ark-ui/vue/locale";
import { formatNumberValue } from "@loongark/kit";
export type { NumberFormatProps as LoongArkFormatNumberProps } from "@loongark/kit";
/** Ark Vue 的构建未声明全部 Intl 属性，在此补齐真实格式化参数。 */
export const LoongArkFormatNumber=defineComponent({name:"LoongArkFormatNumber",props:{
 value:{type:Number,required:true},
 style:String as PropType<Intl.NumberFormatOptions['style']>,currency:String,currencyDisplay:String as PropType<Intl.NumberFormatOptions['currencyDisplay']>,currencySign:String as PropType<Intl.NumberFormatOptions['currencySign']>,
 notation:String as PropType<Intl.NumberFormatOptions['notation']>,compactDisplay:String as PropType<Intl.NumberFormatOptions['compactDisplay']>,signDisplay:String as PropType<Intl.NumberFormatOptions['signDisplay']>,unit:String,unitDisplay:String as PropType<Intl.NumberFormatOptions['unitDisplay']>,
 useGrouping:{type:[Boolean,String] as PropType<Intl.NumberFormatOptions['useGrouping']>,default:undefined},
 minimumIntegerDigits:Number,minimumFractionDigits:Number,maximumFractionDigits:Number,minimumSignificantDigits:Number,maximumSignificantDigits:Number,localeMatcher:String as PropType<Intl.NumberFormatOptions['localeMatcher']>,numberingSystem:String,
 },setup(props){const locale=useLocaleContext(DEFAULT_LOCALE),text=computed(()=>{const {value,...options}=props;return formatNumberValue(value,locale.value.locale,options);});return ()=>text.value;}});
