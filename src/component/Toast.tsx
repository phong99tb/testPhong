import { Box, useToast } from 'native-base';
const Toast = (e:any) => {
    const toast = useToast()
    console.log("abc")
    console.log({e})
    return(
        toast.show({
            render: () => {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    {e}
                </Box>;
            }
        })
    )
}

export default Toast

