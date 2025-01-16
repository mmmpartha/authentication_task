export default interface APIResponse {
     status: boolean;
     message: string;
     error?: any;
     data?: any;
     header?: any;
     links?:any;
   }