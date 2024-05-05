export default function ShopCard(props) {
  const { data } = props;
  return (
    <div className="flex items-center justify-center">
      <div className="card card-side bg-base-100 shadow-xl w-[430px] h-[190px]">
        <div className="card-body">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex size-12 justify-center items-center bg-slate-400 text-white font-bold rounded-xl uppercase">
                <span className="text-lg self-center text-center">
                  {data?.shopName
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </span>
              </div>
              <div className="truncate">
                <div className="font-bold text-xl truncate">{data?.shopName}</div>
                <div className="text-xs opacity-70 capitalize">{data?.ownerName}</div>
                <div className="text-xs opacity-70 capitalize">
                  {data?.shopAddress.shopStreet}, {data?.shopAddress.shopBarangay},{' '}
                  {data?.shopAddress.shopCity}, {data?.shopAddress.shopProvince}
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-2">
              <p className="text-sm">
                <strong>Services Offered:</strong>{' '}
                <span className="capitalize italic badge badge-primary badge-sm text-white">
                  {data?.shopType.join(', ')}
                </span>
              </p>
              <p className="text-sm">
                <strong>Gadget List:</strong>
                <span className="capitalize italic text-blue-700 px-2">{data?.gadgetList.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
