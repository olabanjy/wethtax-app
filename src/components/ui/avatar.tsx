const IAvatar = () => {
  return (
    <div className="flex items-center h-9 gap-2">
      <img
        src="/assets/png/avatar.png"
        alt="Avatar"
        className="w-8 h-8 rounded-full"
      />

      <div>
        <p className="text-xs leading-[18px] font-[500] text-[#2A2A2A]">LIRS</p>
        <p className="text-sm leading-[21px] text-[#717171]">
          Taxpayer ID: 473642
        </p>
      </div>
    </div>
  );
};

export default IAvatar;
